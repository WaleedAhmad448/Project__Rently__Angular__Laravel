<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Favourit;

use App\Models\House;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HouseController extends Controller
{
    
    public function CreateProperty(Request $request)
    {
        $post=new House;
        
        $imageName=Str::random().'.'.$request->HouseImage1->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('Houses/image',$request->HouseImage1,$imageName);
        //House::create($request->post()+['image' => $imageName]);
        $post->HouseImage1=$imageName;
        $post->Titile =$request->Titile;
        $post->Price =$request->Price;
        $post->City =$request->City;
        $post->Adresse =$request->Adresse;
        $post->Emaile =$request->Emaile;
        $post->Phone_number =$request->Phone_number;
        $post->Description =$request->Description;
        $post->Status =$request->Status;
        $post->Type =$request->Type;
        $post->ResntalPeriod =$request->ResntalPeriod;
        $post->user_id =$request->user_id;
        $post->latitude =$request->latitude;
        $post->longitude =$request->longitude;
        $post->save();
        return response()->json(['message' =>'house added successfully']);
    }
    
    public function updateRent(Request $request, $id)
    {
        if(House::where('id',$id)->exists()){
            $house =House::find($id);
            $house->Titile =$request->Titile;
            $house->Price =$request->Price;
            $house->City =$request->City;
            $house->Adresse =$request->Adresse;
            $house->Emaile =$request->Emaile;
            $house->Phone_number =$request->Phone_number;
            $house->Description =$request->Description;
            $house->user_id =$request->user_id;
            $house->latitude =$request->latitude;
            $house->longitude =$request->longitude;
            $house->Status =$request->Status;
            $house->Type =$request->Type;

            $house->save();
            return response()->json([
                "message"=>"house updated successfully"
            ], 200);
        }else{
            return response()->json([
                "message"=>"house not found"
            ], 404);
        }
    }

    
    public function GetAll()
    {
        $houses =House::orderBy('id','desc')->get();
        foreach ($houses as $item) {
            //$date = Carbon::parse($item->created_at)->diffForHumans();
            //$item->created_at=$date;
            Carbon::setlocale('en');
            $item->setAttribute('time',Carbon::parse($item->created_at)->diffForHumans());
        }
        
        return response()->json($houses);
    }

    public function findMyRenting($id)
    {
        if(House::where('id',$id)->exists()){
            $House=House::where('id',$id)->get();
            foreach ($House as $item) {
                //$date = Carbon::parse($item->created_at)->diffForHumans();
                //$item->created_at=$date;
                Carbon::setlocale('en');
                $item->setAttribute('time',Carbon::parse($item->created_at)->diffForHumans());
                //return $item;
            }
            return response($House);
        }else{
            return 1;
        }
    }
    public function MyCreated($id)
    {
        if(House::where('user_id',$id)->exists()){
            $House=House::where('user_id',$id)->get();
            foreach ($House as $item) {
                //$date = Carbon::parse($item->created_at)->diffForHumans();
                //$item->created_at=$date;
                Carbon::setlocale('en');
                $item->setAttribute('time',Carbon::parse($item->created_at)->diffForHumans());
                //return $item;
            }
            return response($House);
        }else{
            return 1;
        }
    }
    public function numerofposts_and_favourits($id)
    {
        if(House::where('user_id',$id)->exists()){
            $response["nbrPosts"]=House::where('user_id',$id)->get()->count();
        }else{
            $response["nbrPosts"]=0;
        }
        if(Favourit::where('user_id',$id)->exists()){
            $response["nbrFavourite"]=Favourit::where('user_id',$id)->get()->count();
        }else{
            $response["nbrFavourite"]=0;
        }
        return response()->json($response);

    }
    
    
    public function deleteHouse($id)
    {
        if(House::where('id',$id)->exists()){
            House::where('id',$id)->delete();
            return 1;
        }else{
            return 0;
        }
    }


    public function search(Request $request)
    {
        $query = House::query();

        if ($request->has('Type')) {
            $query->where('Type', $request->Type);
        }

        if ($request->has('Status')) {
            $query->where('Status', $request->Status);
        }

        if ($request->has('City')) {
            $query->where('City', $request->City);
        }

        if ($request->has('Date')) {
            $query->where('City', $request->City);
        }

        if ($request->has('SortByDate')) {
            $sortByDate = $request->SortByDate;
            if ($sortByDate === 'asc') {
                $query->orderBy('created_at', 'asc');
            } elseif ($sortByDate === 'desc') {
                $query->orderBy('created_at', 'desc');
            }
        }
        
        $houses = $query->get();

        if ($houses->isEmpty()) {
            return [];
        }

        foreach ($houses as $house) {
            Carbon::setlocale('en');
            $house->setAttribute('time', Carbon::parse($house->created_at)->diffForHumans());
        }

        return response()->json($houses);
    }
}
